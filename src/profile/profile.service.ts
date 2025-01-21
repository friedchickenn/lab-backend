import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfileService {
    constructor(private readonly prisma ) {}
    async uploadFile(file : Express.Multer.File, user_id : number) {
        
    }

}
