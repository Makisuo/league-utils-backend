import { Controller, Get, Req, Res, Param, HttpStatus, Body, UnauthorizedException } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
	constructor (private readonly appService: AppService) {}

	@Get()
	getServer (): string {
		return this.appService.getServer()
	}

	@Get('summoner/:name')
	async getSummoner (@Req() req, @Res() res, @Param('name') name: string): Promise<any> {
		const response = await this.appService.getSummonerByName(name)
		return res.status(HttpStatus.OK).json(response)
	}
}
