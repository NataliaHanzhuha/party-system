'use client';

import { CustomThemeWrapper } from '@/src/components/JulietPage/elements';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './media.module.css';
import axios from 'axios';

interface IFormInput {
  email: string
  name: string
}

const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export default function Page({params}: any) {
  const {clientId} = params;
  const { register, handleSubmit , formState: { errors, isValid, isSubmitted }, reset }: any = useForm<IFormInput>({mode: 'onChange'});

  const send = async (data: IFormInput) => {
    await axios.patch('/api/guest/media?clientId=' + clientId, data);
  }

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    send(data);
    reset();
  }

  return <CustomThemeWrapper>
    {isSubmitted
    ? <p className={styles.p}>Thank you for registering; enjoy the rest of the party!!!</p>
    : <div className={styles.page}>
        <p className={styles.p}>Please, leave us your email and name so we can send you a link to the event pictures and video highlights as soon as
           possible.</p>

        <form className={styles.form}
              onSubmit={handleSubmit(onSubmit)}>
          <label>Email *</label>
          <input className={styles.input} {...register("email", {
            required: 'Email is required',
            pattern: {value: re, message: 'Invalid email address'}
          })} />
          {errors?.email && <p className={styles.error}>{errors?.email?.message}</p>}

          <label>Full Name</label>
          <input className={styles.input} {...register("name")} />

          <input disabled={!isValid}
                 className={styles.button}
                 type="submit"/>
        </form>
      </div>
    }


  </CustomThemeWrapper>;
}
