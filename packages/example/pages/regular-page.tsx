import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    props: {},
  };
};

export default function RegularPage() {
  return (
    <Layout>
      <h1>Regular page</h1>
    </Layout>
  );
}
