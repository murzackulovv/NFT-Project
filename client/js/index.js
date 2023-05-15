import { Header } from "./components/header.js";
import { Discover } from "./components/discover.js";
import { NftItem } from "./components/nftItem.js";
import { GetAllHouse } from "./api/nftApi.js";
import { CreateWrapperHouse } from "./components/wrapperHouse.js";
import { TryOur } from "./components/tryOur.js";

const createApp = async () => {
const header = Header();
const discover = Discover();
const houses = await GetAllHouse();
const wrapperHouse = CreateWrapperHouse();
const tryOur = TryOur()

for (const house of houses) {
wrapperHouse.append(NftItem(house));

}

document.body.append(header, discover,  wrapperHouse, tryOur);

};

createApp();