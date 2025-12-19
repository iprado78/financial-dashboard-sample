import { SYSTEM_PROMPT } from "@/services/claude/prompt/prompt";
import { TOOLS } from "@/services/claude/tools/tools";
import Anthropic from "@anthropic-ai/sdk";

export class ClaudeService {
  #client: Anthropic;
  #conversationHistory: Anthropic.MessageParam[] = [];

  constructor(apiKey: string) {
    this.#client = new Anthropic({
      apiKey,
      dangerouslyAllowBrowser: true, // Only for development - move to backend in production
    });
  }

  async sendMessage(
    userMessage: string,
    onToolUse?: (toolName: string, toolInput: any) => any
  ): Promise<string> {
    // Add user message to history
    this.#conversationHistory.push({
      role: "user",
      content: userMessage,
    });

    try {
      // Call Claude API
      let response = await this.#client.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 4096,
        system: SYSTEM_PROMPT,
        messages: this.#conversationHistory,
        tools: TOOLS,
      });

      // Handle tool use
      while (response.stop_reason === "tool_use") {
        const toolUseBlock = response.content.find(
          (block: any) => block.type === "tool_use"
        );

        if (!toolUseBlock || toolUseBlock.type !== "tool_use") break;

        // Execute the tool
        let toolResult: any;
        if (onToolUse) {
          toolResult = await onToolUse(toolUseBlock.name, toolUseBlock.input);
        } else {
          toolResult = { error: "Tool execution not configured" };
        }

        // Add assistant's response with tool use to history
        this.#conversationHistory.push({
          role: "assistant",
          content: response.content as any,
        });

        // Add tool result to history
        this.#conversationHistory.push({
          role: "user",
          content: [
            {
              type: "tool_result",
              tool_use_id: toolUseBlock.id,
              content: JSON.stringify(toolResult),
            } as any,
          ],
        });

        // Get next response from Claude
        response = await this.#client.messages.create({
          model: "claude-sonnet-4-5-20250929",
          max_tokens: 4096,
          system: SYSTEM_PROMPT,
          messages: this.#conversationHistory,
          tools: TOOLS,
        });
      }

      // Extract final text response
      const textBlock = response.content.find(
        (block: any) => block.type === "text"
      );
      const assistantMessage =
        textBlock && textBlock.type === "text"
          ? textBlock.text
          : "I completed the action.";

      // Add final assistant message to history
      this.#conversationHistory.push({
        role: "assistant",
        content: assistantMessage,
      });

      return assistantMessage;
    } catch (error: any) {
      console.error("Claude API error:", error);
      throw new Error(`Failed to get response: ${error.message}`);
    }
  }

  clearHistory() {
    this.#conversationHistory = [];
  }
}
