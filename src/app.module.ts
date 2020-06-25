import { Module, HttpModule } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ConfigModule } from '@nestjs/config'
import { ScrapingModule } from './scraping/scraping.module'

@Module({
	imports: [ ConfigModule.forRoot(), HttpModule, ScrapingModule ],
	controllers: [ AppController ],
	providers: [ AppService ],
})
export class AppModule {}
