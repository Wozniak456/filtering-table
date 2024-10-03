import TableFilter1 from "./components/Table1";
import { getAllMaterialsForModel, getMainView, getColors, getAllColorsForModel, getAllModels, getAllLegsForModel, getAllSizesForModel, getAllEdgesForModel } from "../../db"
import { DataRow } from '@/types/types';

type Model = {
  ID: number,
  ItemID: string,
  FileName: string
}

export default async function Home() {
  const data = await getMainView() || []

  const models = await getAllModels() || []

  const legs = await getDict(models, getAllLegsForModel)

  const colors = await getDict(models, getAllColorsForModel)

  const sizes = await getDict(models, getAllSizesForModel)

  const edges = await getDict(models, getAllEdgesForModel)

  const materials = await getDict(models, getAllMaterialsForModel)

  return (
    <>
      <div className="w-3/4 m-auto my-20">
        <TableFilter1 data={data} colorDict={colors} legsDict={legs} sizesDict={sizes} edgesDict={edges} materialsDict={materials} />
      </div>
    </>
  );
}


const getDict = async (
  models: Model[], 
  getDataForModel: (itemId: string) => Promise<DataRow[] | undefined>
) => {
  let dict: { [key: string]: DataRow[] } = {};

  await Promise.all(models.map(async (model) => {
    const data = await getDataForModel(model.ItemID);

    if (!data) return;

    data.forEach((item) => {
      if (!dict[model.ItemID]) {
        dict[model.ItemID] = [{
          id: item.id,
          name: item.id,
          FN: item.FN,
          qty: item.qty,
          activated: item.activated
        }];
      } else {
        dict[model.ItemID].push({
          id: item.id,
          name: item.id,
          FN: item.FN,
          qty: item.qty,
          activated: item.activated
        });
      }
    });
  }));

  return dict;
};
