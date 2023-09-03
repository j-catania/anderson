type ConfigFile = {
    services: Service[];
}

type Service = {
    name: string;
    port: number;
    path: string;
    method: string;
    host: string;
    secure: boolean;
    interval: number;
    timeout: number;
    notifiers: ServiceNotifier[];
}

type ServiceStatus = {
    name: string;
    status: Status;
    date: Date;
    message?: string;
}

type Status = 'down' | 'up' | 'unknown'

type ServiceNotifier = {
    webhook?: string;
    type: 'discord';
}
