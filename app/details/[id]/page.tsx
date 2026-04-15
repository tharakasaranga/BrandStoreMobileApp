import ProductDetailsView from "@/components/product/ProductDetailsView";
import MobileContainer from "@/components/ui/MobileContainer";
import { products } from "@/lib/data";

type ProductDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;

  const product = products.find((item) => item.id === id) ?? products[0];

  return (
    <MobileContainer>
      <ProductDetailsView product={product} />
    </MobileContainer>
  );
}
