import { Address, BaseAddress, RewardAddress } from "@emurgo/cardano-serialization-lib-nodejs";
import { Injectable } from "@nestjs/common";

@Injectable()
export class EmurgoService {
    generateStakeKeyFromAddress({ walletAddress }: { walletAddress: string }): string {
        const addr = Address.from_bech32(walletAddress);
        const baseAddress = BaseAddress.from_address(addr);
        const stakeCred = baseAddress?.stake_cred();
        const rewardAddressBytes = new Uint8Array(29);
        rewardAddressBytes.set([0xe1], 0);
        rewardAddressBytes.set(stakeCred.to_bytes().slice(4, 32), 1);
        const rewardAddress = RewardAddress.from_address(Address.from_bytes(rewardAddressBytes));
        return rewardAddress?.to_address().to_bech32();
    }
}
