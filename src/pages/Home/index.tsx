import { PostLogout } from '@/service/common/login';
import { useModel } from '@@/plugin-model';

const HomePage: React.FC = () => {
  const { refresh } = useModel('@@initialState');
  refresh();
  return (
    <div>
      <button type="button" onClick={() => PostLogout()}>
        推出
      </button>
    </div>
  );
};

export default HomePage;
