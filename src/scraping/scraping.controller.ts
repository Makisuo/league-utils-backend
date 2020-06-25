import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common'
import { ScrapingService } from './scraping.service'

//Scraping endpoint this enpoint scrapes u.gg for data of an specific champion or user
@Controller('scraping')
export class ScrapingController {
	constructor (private readonly scrapingService: ScrapingService) {}

	//WIP: BUILD BUNDLE TOO BIG
	@Get('/champion/:champName')
	async scrapeChampion (@Res() res, @Param('champName') name: string): Promise<any> {
		const response = await this.scrapingService.scrapeChampionStats(name)
		return res.status(HttpStatus.OK).json(response)
	}

	//WIP: BUILD BUNDLE TOO BIG
	@Get('/summoner/:region/:name')
	async scrapeSummoner (@Res() res, @Param('name') name: string, @Param('region') region: string): Promise<any> {
		const response = await this.scrapingService.scrapeSummonerStats(name, region)
		return res.status(HttpStatus.OK).json(response)
	}
}
