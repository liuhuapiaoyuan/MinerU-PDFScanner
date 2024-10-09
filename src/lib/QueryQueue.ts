// 实现一个异步任务队列
class AsyncQueryQueue {
  private queue: (() => Promise<any>)[] = [];
  private isProcessing: boolean = false;

  // 添加一个异步任务到队列中
  public enqueue(task: () => Promise<any>): void {
    this.queue.push(task);
    this.processQueue();
  }

  // 处理队列
  private async processQueue(): Promise<void> {
    if (this.isProcessing) return; // 如果已经在处理，则直接返回
    this.isProcessing = true;
    console.log('开始处理队列');
    while (this.queue.length > 0) {
      const currentTask = this.queue.shift();
      if (currentTask) {
        try {
          await currentTask(); // 执行当前任务
        } catch (error) {
          console.error('任务执行出错:', error);
        }
      }
    }

    this.isProcessing = false; // 处理完所有任务后，设置为未处理状态
  }

  // 获取队列中任务的数量
  public size(): number {
    return this.queue.length;
  }

  // 清空队列
  public clear(): void {
    this.queue = [];
  }

 
}

export default AsyncQueryQueue;