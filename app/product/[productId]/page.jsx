
export const generateMetadata = ({ params }) => {
  return {
    title: `This is ${params.productId}`,
    description: "This is a product 1 information",
  };
};

export default function productId({ params }) {
  return (
    <div>
      <h1>this is product {params.productId}</h1>
    </div>
  );
}
