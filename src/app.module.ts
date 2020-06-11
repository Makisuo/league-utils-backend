import { Module, HttpModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'

@Module({
	imports: [ ConfigModule.forRoot(), HttpModule ],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule {}
