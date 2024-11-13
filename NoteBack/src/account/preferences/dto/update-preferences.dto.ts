import { IsBoolean, IsEmail, IsString } from "class-validator";

export class UpdatePreferencesDto {
    @IsString()
    theme: string;
}