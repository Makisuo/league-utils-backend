import { Controller, Get, Req, Res, Param, HttpStatus, Body, UnauthorizedException } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor (private readonly appService: AppService) {}

	@Get()
	getServer (): string {
		return this.appService.getServer()
	}

	@Get('summoner/by-name/:name')
	async getSummonerByName (@Req() req, @Res() res, @Param('name') name: string): Promise<JSON> {
		const response = await this.appService.getSummonerByName(name)
		console.log(response)
		return res.status(HttpStatus.OK).json(response)
	}

	@Get('mastery/by-name/:name')
	async getMasteryDataBySummonerName (@Res() res, @Param('name') name: string): Promise<JSON> {
		const response = await this.appService.getMasteryDataBySummonerName(name)
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
}
