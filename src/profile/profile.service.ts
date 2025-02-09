import { Injectable, NotFoundException } from '@nestjs/common';
import { existsSync, rmSync, mkdirSync, writeFileSync } from 'fs';
import path, { extname } from 'path';
import prisma from 'src/prisma';


@Injectable()
export class ProfileService {
   
    async uploadFile(file : Express.Multer.File, user_id : number) {
        const user = await prisma.user.findFirst({
            where : {
                id : user_id
            }
        })
        if (user == null) throw new NotFoundException("User tidak ditemukan")
        
        if(user.foto_profile != null) {
            const filepath = `../../uploads/${user.foto_profile}`;
            if(existsSync(filepath)) {
                rmSync(filepath)
            }
        }

        const uploadPath = '../../uploads';
        if (!existsSync(uploadPath)) {
            mkdirSync(uploadPath);
        }
        const fileExt = extname(file.originalname);
        const baseFileName = user.username;
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileName = `${baseFileName}-${uniqueSuffix}${fileExt}`;
        const filePath = `${uploadPath}/${fileName}`;

        writeFileSync(filePath, file.buffer);
        await prisma.user.update({
            where : {
                id : user_id
            },
            data : {
                foto_profile : fileName
            }
        })
        return { fileName, path : filePath};
    }
    async sendMyFotoProfile(user_id : number) {
        const user = await prisma.user.findFirst({
            where : {
                id : user_id
            }
        })
        if (user == null) throw new NotFoundException("User tidak ditemukan")
        return user.foto_profile;
    }
}


