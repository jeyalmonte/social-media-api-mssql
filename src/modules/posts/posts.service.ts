import { BadRequestException, Injectable } from '@nestjs/common';
import { MssqlService } from 'src/database/services';
import { BodyCreatePostDto } from './dto';
import { BodyUpdatePostDto } from './dto/body-update-post.dto';

@Injectable()
export class PostsService {
    constructor(private readonly mssqlService: MssqlService) { }

    async getPosts() {
        try {
            const pool = await this.mssqlService.getConnection();
            const result = (await pool.query('SP_GET_POSTS')).recordsets;

            return {
                response: result[1][0],
                data: result[0],
            }

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async getPostsByUser(email: string) {
        try {
            const pool = await this.mssqlService.getConnection();
            const result = (await pool.request()
                .input('email', email)
                .execute('SP_GET_POSTS_BY_USER'))
                .recordsets;

            return {
                response: result[1][0],
                data: result[0],
            }

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async createPost(params: BodyCreatePostDto) {
        try {
            const pool = await this.mssqlService.getConnection();
            const result = (await pool.request()
                .input('description', params.description)
                .input('userId', params.userId)
                .input('image', params.image)
                .execute('SP_CREATE_POST'))
                .recordset[0];

            return result;

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }


    async updatePost(id: number, params: BodyUpdatePostDto) {
        try {
            const pool = await this.mssqlService.getConnection();
            const result = (await pool.request()
                .input('id', id)
                .input('description', params.description)
                .input('image', params.image)
                .execute('SP_UPDATE_POST'))
                .recordset[0];

            return result;

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    async deletePost(id: number) {
        try {
            const pool = await this.mssqlService.getConnection();
            const result = (await pool.request()
                .input('id', id)
                .execute('SP_DELETE_POST'))
                .recordset[0];

            return result;

        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

}
