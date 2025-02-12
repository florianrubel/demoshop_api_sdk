import { HubConnectionBuilder, type HubConnection, HubConnectionState, HttpTransportType, LogLevel } from '@microsoft/signalr';

import { ACCESS_TOKEN } from '~api/constants/tokens';

export class ProductCacheHub {
    private connection: HubConnection | null = null;
    private onCacheProgress?: (current: number, count: number) => void;

    constructor(callbacks?: {
        onCacheProgress?: (current: number, count: number) => void
    }) {
        this.onCacheProgress = callbacks?.onCacheProgress;
    }

    async startConnection(): Promise<void> {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) return;
        try {
            this.connection = new HubConnectionBuilder()
                .withUrl("https://localhost:7230/hubs/product-cache", {
                    accessTokenFactory: async () => accessToken,
                    transport: HttpTransportType.WebSockets
                })
                .build();

            this.connection.on("cache-progress", data => {
                if (this.onCacheProgress) this.onCacheProgress(data.current, data.count);
            });

            await this.connection.start();
            console.log('Product Cache Hub connected');
        } catch (error) {
            console.log('Product Cache Hub connection failed', error);
        }
    }

    async stopConnection(): Promise<void> {
        if (!this.connection) return;
        try {
            await this.connection.stop();
            console.log('Product Cache Hub disconnected');
        } catch (error) {
            console.log('Product Cache Hub disconnection failed', error);
        }
    }

    isConnected(): boolean {
        return  !!this.connection && this.connection.state === HubConnectionState.Connected;
    }
}
