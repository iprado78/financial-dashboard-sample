import { useState, useRef, useEffect } from 'react'
import { PaperAirplaneIcon, XMarkIcon, ChatBubbleLeftRightIcon, TrashIcon } from '@heroicons/react/24/outline'

interface Message {
	id: string
	role: 'user' | 'assistant'
	content: string
	timestamp: Date
}

interface ChatWidgetProps {
	onSendMessage: (message: string) => Promise<void>
	onClearChat: () => void
	messages: Message[]
	isLoading: boolean
}

export default function ChatWidget({ onSendMessage, onClearChat, messages, isLoading }: ChatWidgetProps) {
	const [input, setInput] = useState('')
	const [isMinimized, setIsMinimized] = useState(false)
	const messagesEndRef = useRef<HTMLDivElement>(null)

	const scrollToBottom = () => {
		messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
	}

	useEffect(() => {
		scrollToBottom()
	}, [messages])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!input.trim() || isLoading) return

		const userMessage = input.trim()
		setInput('')
		await onSendMessage(userMessage)
	}

	if (isMinimized) {
		return (
			<button
				onClick={() => setIsMinimized(false)}
				className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-all z-50"
			>
				<ChatBubbleLeftRightIcon className="h-6 w-6" />
			</button>
		)
	}

	return (
		<div className="fixed top-20 right-0 w-full md:w-96 bg-white dark:bg-slate-800 border-l border-slate-200 dark:border-slate-700 shadow-xl z-40 flex flex-col h-[calc(100vh-5rem)]">
			{/* Header */}
			<div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900">
				<div className="flex items-center space-x-2">
					<ChatBubbleLeftRightIcon className="h-5 w-5 text-blue-600" />
					<h3 className="font-semibold">Claude Assistant</h3>
				</div>
				<div className="flex items-center space-x-2">
					<button
						onClick={onClearChat}
						className="text-slate-500 hover:text-red-600 dark:text-slate-400 dark:hover:text-red-400 transition-colors"
						title="Clear chat history"
					>
						<TrashIcon className="h-5 w-5" />
					</button>
					<button
						onClick={() => setIsMinimized(true)}
						className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
						title="Minimize chat"
					>
						<XMarkIcon className="h-5 w-5" />
					</button>
				</div>
			</div>

			{/* Messages */}
			<div className="flex-1 overflow-y-auto p-4 space-y-4">
				{messages.length === 0 && (
					<div className="text-center text-slate-500 dark:text-slate-400 mt-8">
						<p className="text-sm">Ask me to filter tables, analyze data, or navigate the app!</p>
						<p className="text-xs mt-2">Try: "Show me trades over $1000" or "Filter holdings by Technology sector"</p>
					</div>
				)}
				{messages.map((message) => (
					<div
						key={message.id}
						className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
					>
						<div
							className={`max-w-[80%] rounded-lg px-4 py-2 ${
								message.role === 'user'
									? 'bg-blue-600 text-white'
									: 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
							}`}
						>
							<p className="text-sm whitespace-pre-wrap">{message.content}</p>
						</div>
					</div>
				))}
				{isLoading && (
					<div className="flex justify-start">
						<div className="bg-slate-100 dark:bg-slate-700 rounded-lg px-4 py-2">
							<div className="flex space-x-2">
								<div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
								<div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
								<div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
							</div>
						</div>
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Input */}
			<form onSubmit={handleSubmit} className="p-4 border-t border-slate-200 dark:border-slate-700">
				<div className="flex space-x-2">
					<input
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						placeholder="Ask me anything..."
						disabled={isLoading}
						className="flex-1 px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 disabled:opacity-50"
					/>
					<button
						type="submit"
						disabled={!input.trim() || isLoading}
						className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						<PaperAirplaneIcon className="h-5 w-5" />
					</button>
				</div>
			</form>
		</div>
	)
}

export { type Message }
