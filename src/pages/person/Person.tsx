//个人信息
import { useParams } from '@@/exports';
import React, { useEffect, useState } from 'react';
import { Account, SelectAccountById } from '@/service/account/account';
import PersonTopicPost from '@/pages/person/PersonTopicPost';
import PersonOrAddFriend from '@/pages/person/PersonOrAddFriend';
import BackButton from '@/components/BackButton';
import { CheckRelation } from '@/service/relation/relation';

export default () => {
  const params = useParams();
  const [account, setAccount] = useState<Account>({ userId: '', userName: '' });
  const [friendType, setFriendType] = useState(-1);
  useEffect(() => {
    // @ts-ignore
    SelectAccountById(params.userId).then((res) => {
      setAccount({
        userId: res.userId,
        userName: res.userName,
      });
    });
    // @ts-ignore
    CheckRelation(params.userId).then((res) => {
      setFriendType(res);
    });
  }, []);
  console.log(account);
  return (
    <div className="flex justify-between">
      <div className="w-1/3">
        <BackButton />
        <div>
          <PersonOrAddFriend
            userId={account.userId}
            userName={account.userName}
            friendType={friendType}
            setFriendType={setFriendType}
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
