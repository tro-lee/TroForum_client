//个人信息
import { useParams } from '@@/exports';
import React, { useEffect, useState } from 'react';
import { Account, SelectAccountById } from '@/service/account/account';
import PersonTopicPost from '@/pages/person/PersonTopicPost';
import PersonOrFollow from '@/pages/person/PersonOrFollow';
import BackButton from '@/components/BackButton';
import { checkRelation } from '@/service/relation/relation';

export default () => {
  const params = useParams();
  const [account, setAccount] = useState<Account>({ userId: '', userName: '', avatarUrl: '', description: '' });
  const [type, setType] = useState(0);
  useEffect(() => {
    // @ts-ignore
    SelectAccountById(params.userId).then((res) => {
      setAccount({
        userId: res.userId,
        userName: res.userName,
        avatarUrl: res.avatarUrl,
        description: res.description,
      });
    });
    // @ts-ignore
    checkRelation(params.userId).then((res) => {
      setType(res);
    });
  }, []);
  console.log(account);
  return (
    <div className="flex justify-between">
      <div className="w-1/3">
        <BackButton />
        <div>
          <PersonOrFollow
            userId={account.userId}
            userName={account.userName}
            type={type}
            setType={setType}
          />
        </div>
      </div>
      <div className="w-1/2">
        <h2 className="text-lg font-bold mb-2">个人信息页</h2>
        <hr className="mb-2" />
        <div>
          <PersonTopicPost userId={params.userId} />
        </div>
      </div>
    </div>
  );
};
