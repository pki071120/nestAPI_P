import { PartialType } from "@nestjs/mapped-types";
import { IsNumber, IsString } from "class-validator";
import { CreateMovieDTO } from "./create-moive.dto";

export class UpdateMovieDTO extends PartialType(CreateMovieDTO) {}