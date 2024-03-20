import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto, EditUserDto } from "./dto";

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) {}

    async getUsers() {
        const Users = await this.prisma.user.findMany();
        return Users;
    }

    async getUser({ id }: { id: string }) {
        const existUser = await this.prisma.user.findFirst({
            where: { id: id },
        });
        if (!existUser) throw new NotFoundException("User is not found");
        return existUser;
    }

    async createUser({ dto }: { dto: CreateUserDto }) {
        const existUser = await this.prisma.user.findFirst({
            where: {},
        });
        if (existUser) throw new BadRequestException("User already exists");
        const User = await this.prisma.user.create({
            data: {
                email: dto.email,
                password: dto.password,
                role: dto.role,
            },
        });
        return User;
    }

    async updateUser({ id, dto }: { id: string; dto: EditUserDto }) {
        const existUser = await this.getUser({ id: id });
        const User = await this.prisma.user.update({
            where: { id: existUser.id },
            data: {
                email: dto.email ? dto.email : existUser.email,
                password: dto.password ? dto.password : existUser.password,
                role: dto.role ? dto.role : dto.role,
            },
        });
        return User;
    }

    async deleteUser({ id }: { id: string }) {
        const existUser = await this.getUser({ id: id });
        await this.prisma.user.delete({ where: { id: existUser.id } });
    }
}
