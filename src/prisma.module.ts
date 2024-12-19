import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
    providers: [PrismaService],
    exports: [PrismaService],  // Đảm bảo PrismaService được xuất khẩu
})
export class PrismaModule { }
