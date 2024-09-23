import client from '../../tina/__generated__/client'; 
import { blocksRenderer as BlocksRenderer } from '../../components/shared/Blocks/blocksRenderer';

interface ProductPageProps {
  params: { product: string };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = params.product;
  
  console.log('Found product:', product);
  console.log(`Querying TinaCMS for ${product}/home.json`);

  const productData = await getPage(product);
  console.log(productData.pageBlocks);

  return (
    <div>
      <h1>Product: {product}</h1>
      <pre>{JSON.stringify(productData, null, 2)}</pre>    
      <p> UNDER HERE WE WILL RENDER THE BLOCKS</p>
      {/* TODO: investigate why this is erroring but working */}
      {/* @ts-expect-error */}
      <BlocksRenderer data={{ pageBlocks: productData.pageBlocks ?? null }} />

    </div>
  );
}

//test comment2


async function getPage(product: string) {
  try {
    const pageContent = await client.queries.pages({
      relativePath: `${product}/home.json`,
    });

    return pageContent?.data?.pages || {};
  } catch (error) {
    console.error("Error fetching TinaCMS data:", error);
    throw new Error(`Could not fetch data for ${product}/home.json`);
  }
}
