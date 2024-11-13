import { IsBoolean, IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateNoteDto {
    
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    note?: string;

    @IsBoolean()
    @IsOptional()
    isPinned?: boolean;
}