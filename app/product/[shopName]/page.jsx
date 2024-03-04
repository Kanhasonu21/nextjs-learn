
export const generateMetadata = async ({ params,use },parent) => {
  // const data = await parent;
  // console.log('--->',data);

  return {
    title: `This is ${params.shopName}`,
    description: "This is a product 1 information",
    openGraph:{
      title:`Find tasty food @ ${params.shopName}`,
      description:'This is tasty restaurant'
    }
  };
};

export default function shopName({ params }) {
  return (
    <div>
      <h1>this is product {params.shopName}</h1>
    </div>
  );
}
