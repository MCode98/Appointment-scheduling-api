import { Injectable} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenId } from "./token_id.entity";
import { Repository } from "typeorm";

export class InvalidatedRefreshTokenError extends Error {}
@Injectable()
export class RefreshTokenIdsStorage
{
   constructor(
      @InjectRepository(TokenId)
      private repoTokenId: Repository<TokenId>,
    ) { }

 async insert(userId: number, tokenId: string, role: string): Promise<void> {
   const existing = await this.repoTokenId.findOneBy({key: this.getKey(userId, role)});
   if (existing) {
      existing.value = tokenId;
      await this.repoTokenId.save(existing);
   }
   else {
      const new_key = new TokenId();
      new_key.key = this.getKey(userId, role);
      new_key.value = tokenId;
      await this.repoTokenId.save(new_key);
   }
 }

 async validate(userId: number, tokenId: string, role: string): Promise<boolean> {
    const stored = await this.repoTokenId.findOneBy({key: this.getKey(userId, role)});
    const storedId = stored.value;
    if (storedId !== tokenId) {
      throw new InvalidatedRefreshTokenError();
    }
    return storedId === tokenId;
 }

 async invalidate(userId: number, role: string): Promise<void> {
   const invalid_record = await this.repoTokenId.findOneBy({key: this.getKey(userId, role)});
    await this.repoTokenId.remove(invalid_record);
 }

 private getKey(userId: number, role: string): string {
    return `${role}-${userId}`;
 }
}
