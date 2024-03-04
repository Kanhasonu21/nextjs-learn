
export const generateMetadata = async ({ params, },parent) => {
    const data = await parent;
    console.log('--->',params);
  
    return {
      title: `This is ${params.productId} on ${params.shopName}`,
      description: "This is a product 1 information",
      openGraph:{
        title:`Find tasty food @ ${params.productId}`,
        description:'This is tasty restaurant'
      }
    };
  };
  
  export default function productId({ params }) {
    return (
      <div>
        <h1>Looking for {params.productId} on {params.shopName}</h1>
      </div>
    );
  }
  