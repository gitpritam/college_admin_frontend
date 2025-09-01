export interface IEvent {
    title: string;
    description: string;
    start_date: Date;
    end_date: Date;
    start_time: string;
    end_time?: string;
    venue: string;
}