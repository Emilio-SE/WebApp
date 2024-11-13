import { IsBoolean, IsString } from "class-validator";

export class CreatePreferencesDto {
    @IsString()
    theme: string;
}