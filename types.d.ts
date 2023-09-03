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
}

type ServiceStatus = {
    name: string;
    service: Service;
    status: 'down' | 'up' | 'unknown'
    date: Date;
    message?: string;
}
