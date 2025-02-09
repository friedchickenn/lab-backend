import { Body, Controller, Delete, Get, Post,Param,Put, Res, UseGuards, UseInterceptors, UploadedFile, BadRequestException, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import {CreateMahasiswaDTO } from './dto/create-Mahasiswa.dto';
import { UpdateMahasiswaDTO } from './dto/update-mahasiswa.dto';
import { RegisterUserDTO } from './dto/register-user.dto';
import { Response } from 'express';
import { AuthGuard } from './auth.guards';
import { UserDecorator } from './user.decorator';
import { plainToInstance } from 'class-transformer';
import { User } from './entity/user.entity';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('mahasiswa/search')
  async cariMahasiswa(@Query('nama') nama: string) {
    return this.appService.cariMahasiswa({ nama });
  }

  @Post('mahasiswa/:nim/upload')
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  async uploadMahasiswaFoto(@UploadedFile() file: Express.Multer.File, @Param('nim') nim: string) {
    if (!file) throw new BadRequestException('File tidak boleh kosong');
    return this.appService.uploadMahasiswaFoto(file, nim);
  }

  @Get('mahasiswa/:nim/foto')
  async getMahasiswaFoto(@Param('nim') nim: string, @Res() res: Response) {
    const filename = await this.appService.getMahasiwaFoto(nim);
    return res.sendFile(filename, { root: 'uploads' });
  }



  @Post("Mahasiswa")
  @ApiBody({type : CreateMahasiswaDTO})
  createMahasiswa(@Body()data : CreateMahasiswaDTO){
    return this.appService.addMahasiswa(data);
}
@Get("mahasiswa")
getmahasiswa() {
  return this.appService.getMahasiswa();
}

@Post("register")
@ApiBody({
  type : RegisterUserDTO})
register(@Body() user : RegisterUserDTO) {
  return this.appService.register(user)
}

@Get("/auth")
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  auth(@UserDecorator() user : User) {
    return user
   }


@Post("login")
@ApiBody({ 
  type : RegisterUserDTO
})
async login( @Body() data : RegisterUserDTO, 
@Res({passthrough : true}) res : Response ) {
  const result = await this.appService.login(data)
  res.cookie("token", result.token)

  // result.user = plainToInstance(User, result.user)

  return result
}


//DELETE localhost:3000/mahasiswa/105841104322
 @Delete("mahasiswa/:nim")
 deletMahasiswa(@Param("nim")nim : string){
  return this.appService.deleteMahasiswa(nim);
 }


  @Put("mahasiswa/:nim")
  @ApiBody({ type : UpdateMahasiswaDTO})
  editMahasiswa(
     @Param("nim") nim : string, @Body() { nama }: UpdateMahasiswaDTO
    ) {
      return this.appService.UpdteMahasiswa(nim,nama);
     
  }


  @Get("mahasiswa/:nim")
  getMahasiswaByNim(@Param("nim") nim : string){
    return this.appService.getMahasiswaByNIM(nim);
  }
  
}

