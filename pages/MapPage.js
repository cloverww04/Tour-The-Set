import { useRouter } from 'next/router';
import Map from '../components/Maps';

function MapPage() {
  const router = useRouter();
  const { address } = router.query;

  return (
    <div>
      <h1>Tour-The-Set</h1>
      <Map address={address} />
    </div>
  );
}

export default MapPage;
