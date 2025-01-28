import { HubConnectionBuilder, type HubConnection, HubConnectionState } from '@microsoft/signalr';

export class PropertyValueCacheHub {
    private connection: HubConnection;

    constructor(callbacks?: {
        onCacheProgress?: (current: number, count: number) => void
    }) {
        this.connection = new HubConnectionBuilder()
            .withUrl("https://localhost:7272/hubs/property-value-cache")
            .build();

        this.connection.on("cache-progress", data => {
            console.log(data);
        });
    }

    async startConnection(): Promise<void> {
        try {
            await this.connection.start();
            console.log('Hub connected');
        } catch (error) {
            console.log('Hub connection failed', error);
        }
    }

    async stopConnection(): Promise<void> {
        try {
            await this.connection.stop();
            console.log('Hub disconnected');
        } catch (error) {
            console.log('Hub disconnection failed', error);
        }
    }

    isConnected(): boolean {
        return this.connection.state === HubConnectionState.Connected;
    }
}
