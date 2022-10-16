import Layout from '../components/Layout';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps<{}> = async () => {
  await new Promise(resolve => setTimeout(resolve, 5000));

  return {
    props: {},
  };
};

export default function SlowPage() {
  return (
    <Layout>
      <h1>Slow page</h1>
    </Layout>
  );
}
