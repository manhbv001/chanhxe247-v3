import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { PriceListService } from "./price-list.service";

@Module({
    providers: [PriceListService],
    exports: [PriceListService],
    imports: [UserModule]
})
export class PriceListModule {}