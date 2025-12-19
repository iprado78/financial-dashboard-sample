export type Emitter<T> = (value: T) => void;
export type Listener<T> = (value: T) => void;
export type Subscribe<T> = (listener: Listener<T>) => () => void;

interface IObservableValue<T> {
  getValue: () => T;
  next: Emitter<T>;
  subscribe: Subscribe<T>;
}

export class ObservableValue<T> implements IObservableValue<T> {
  #value: T;
  #listeners: Set<Listener<T>> = new Set();

  constructor(initialValue: T) {
    this.#value = initialValue;
  }

  getValue(): T {
    return this.#value;
  }

  next(value: T): void {
    this.#value = value;
    this.#listeners.forEach((listener) => listener(value));
  }

  subscribe(listener: Listener<T>): () => void {
    this.#listeners.add(listener);
    listener(this.getValue());
    return () => this.#listeners.delete(listener);
  }
}
