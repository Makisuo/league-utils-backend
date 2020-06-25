import { Controller, Get, Res, Param, HttpStatus } from '@nestjs/common'
import { AppService } from './app.service'
import puppeteer = require('puppeteer')

@Controller()
export class AppController {
	constructor (private readonly appService: AppService) {}

	@Get()
	getServer (): string {
		return this.appService.getServer()
	}

	@Get('summoner/by-name/:name')
	async getSummonerByName (@Res() res, @Param('name') name: string): Promise<JSON> {
		const response = await this.appService.getSummonerByName(name)
		return res.status(HttpStatus.OK).json(response)
	}

	@Get('mastery/by-name/:name')
	async getMasteryDataBySummonerName (@Res() res, @Param('name') name: string): Promise<JSON> {
		const response = await this.appService.getMasteryDataBySummonerName(name)
		return res.status(HttpStatus.OK).json(response)
	}

	@Get('mastery/by-champ/:champion/by-name/:username/')
	async getMasteryDataBySummonerNameByChampion (
		@Res() res,
		@Param('username') username: string,
		@Param('champion') champion: string,
	): Promise<JSON> {
		const response = await this.appService.getMasteryDataOfChampionBySummonerName(username, champion)
		return res.status(HttpStatus.OK).json(response)
	}

	@Get('mastery/lowest/by-name/:name')
	async getLowestMasteryDataBySummonerName (@Res() res, @Param('name') name: string): Promise<JSON> {
		const response = await this.appService.getLowestChampionMastery(name)
		return res.status(HttpStatus.OK).json(response)
	}

	@Get('mastery/next/by-name/:name')
	async getNextMasteryDataBySummonerName (@Res() res, @Param('name') name: string): Promise<JSON> {
		const response = await this.appService.getNextChampionLevelUp(name)
		return res.status(HttpStatus.OK).json(response)
	}

	@Get('scrape')
	async scrape (@Res() res): Promise<any> {
		const browser = await puppeteer.launch({ headless: false })

		const page = await browser.newPage()
		await page.goto('https://u.gg/lol/champions/aatrox/build')

		const elements = await page.$$('.value')
		const data: string[] = []
		for (let index = 0; index < elements.length; index++) {
			data[index] = await (await elements[index].getProperty('innerHTML')).jsonValue()
		}

		const role = await (await (await page.$('.role-value > div')).getProperty('innerHTML')).jsonValue()
		await browser.close()

		return res.status(HttpStatus.OK).json({
			champion: 'aatrox',
			role: role,
			winrate: data[0],
			rank: data[1],
			pickrate: data[2],
			banrate: data[3],
			matchcount: data[4],
		})
	}
}
