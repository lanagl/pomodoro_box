interface ITaskItem {
    id: string;
    count: number;
    description: string;
    started: boolean;
    paused: boolean;
    finish: boolean;
    completedTime: number;
    order: number;
}