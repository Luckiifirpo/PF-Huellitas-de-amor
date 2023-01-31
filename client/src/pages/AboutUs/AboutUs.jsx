// import { Grid } from '@mui/material'
// import { Container } from '@mui/system'
import React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TeamMemberCard from "../../components/TeamMemberCard/TeamMemberCard";
import CardViewer from "../../components/CardViewer/CardViewer";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentPage } from "../../redux/slices/aboutUsSlice";
import { useEffect } from "react";


const testingData = [
  {
    id: "0",
    name: "Alejandro Palacios Gomez",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/3ahm46q8aPmUP93qSJiBwV5cX9n3H8T5g7RpfRv-fDFT53rR3MghdwTXRwzk-IP6rBP185kJT-l_lSF7LIfqFYTpI_ICPexHx1fasYWj2J3zADXt1dHtuk6u6WxvwZakXyvPAsORqWbqxdzeMNMNrFgtawFrLc0acyYNNSQscRLr3JADmDqg9to_vId3PPqjmH1pMSBxo1oDUzTnMReY_v1xXDcS7s0fklQPmiNWx9fx3Q_vZKsT5u9btI5cu4XGP4q-JdaGM9IIhclTfoy9aTSxk_FzKkNpC5vVTv9r7Jt1jGwNNZS5GWo4ZIx9iochCzHLm78TDodhwsejUV2GmERF8m03dfbQpN3hBghfinT6XMlYRgsIbBWmBwzb81bF5kMXAQSllMNcNTyp8z-lRybJHLaD_QwT0Vdz0Kvd5QnefchkPz-CLQ4rJHNTFJtQ_ilwovMUsY67pRtMIfSvRSKUiuBmVPZXoPZP_-XTiVDYMURyr1vVkL_ogacXjJY1NzvoysUDARbpm69hM0dQ2a_-9Ft6fYLYOITvrimNn5HAX4GXfMHGlY9ubWfMbmqDzXi3appfU-M7BKbFaBdqjX1sRkJ6jjwjGO1gK8xQB5ZjKfC8CEPsRRiR0QyrbGxTETo1S89Gui7IIw2bjvf9pynB4hIdSy4S6RNz2d444P3c370IsEaLC-hf-wMWvcuVljvpucDesIQuNvBW8mUB2KvhYj6NuPZKA2jhwJXqfdujhyfH80y1P1q0DqC1C3JTyCBYMc96DXLxoXMl8SdP9k9cgLfzP3mhvSu-m69lpOE_OFIk6SafyAARtqUQfiEXIWMPJxMq-Wn-NwfFUdNz3WuSFblRIm6CaYplKzUshTNQgu_y32Bli-XTOLXOHngOUFPzZGH4QYRvYRyOpZUiJeWQmuTnZ3yPXYdwxK74hpoFU4aYJ2s4usviF0wsOkwrQPDei_4jpKrmkI5llW1vy8SOfoYdIHpJUCDgnDls59GJe3AaxGgi01zG5X5E89G9TfOwsYNLYzHnr15FsQbvDVLk=s297-no?authuser=3",
    github: "https://github.com/Alexpalagomez1255",
    linkedin: "https://www.linkedin.com/in/alejandro-palacios-6a1292172",
  },
  {
    id: "1",
    name: "Oscar William Burgos Serpa",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/7RwWw7WwTIHQGNIn1QF4x-1bJr3HLNiDP-8SXsEdjy7bVXolA72867f881bpZiILn5kdScezFpZhu69QEDBfUwY_P0IxMbOSTMh8hdpVsFSL5KcmwCUqi3uMXO_PB8G0v4h7M5JxfA8qZA9fp4lL_MD4IyT-0JRB_5ev3krSLkW0wKSlE2xK5C46kIfqtvCC0HcxEKr_Ru0gpVMptDv1eVekS91eHc58ZzVqYqoddGPHHBx0kcHiIKJG2O_gck0nm86vOYn36t4pfd4bDMozTt5JZQt19CaXfBmrfU9Hwwnp2LfmKlKXNyaGLZvIBw-2LJZgkac5M7rHCWvyPqwPwZ8Y4lUkruwZCqV84Hdh3Af2lr-w-5Rj3tqlgN031TMh3c-vpVqvkwg7_zGlE7SNZqmwDce6-vDjGQdbyqo77X4hbnAPRu94jEhXfK43v7R8-pc2O1goG0U0U3Hi9bDCWjWtI-DvLnCFVgL46WR90tkD2j0U58B39TpbvvJc8JssAu_v4uWXIJ4lwuXbxc6MfEMyD1ib0S8wOllVwpXHfTrno2cobBgEnS4DOqFFSXVCxpaGEahbB52nkWJF54JiZjAjrZhyeNtLooJmg93ofF32GswGSvXlI1wYPOBpZFv7pgpKyX-XNX90gib6RJpkrnZTK19rS_CkAcMB5QaofCYaTOZMUmDAKWx-EpNBr7kv52BEvT9InpwgTN6p-v5HDysWDdpqEqK-GoWd5XVC-lbqm8GETGGaq6IvR6g4BpnL8xdZay9wGVHYV-dGcUS-hJjb-Bdr9BMoCinF-jIL8WsN-HUHswMhsPqmrSAQU61gzh3wkOEJWUH0Yd7qMd_UQqQH9xky7pabNg2T6tkFKLNRRW7cypTPBoPjmBFIK9dy9b_kMFQTiFksmSj4hzfx6317f6pw2F_BEA6To4Od1pAsfoNhJSmDi9p5DzDGh_Yv_8-GfkrVGHu05CrMrZLkyWlpZBdrrtCyrZWolBnexAIJUPEFCEZBXCzYWuvbIoU9jkXbIwKOhy4ZKseJFFHHeUo5=w523-h639-no?authuser=3",
    github: "https://github.com/Oskarp88",
    linkedin: "https://www.linkedin.com/in/oscar-william-burgos-serpa-009675252",
  },
  {
    id: "2",
    name: "Lereysis Quezada Rojas",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/JBuusYZ2dFRJMDclJDqXsq-G61pXaDteOFtd3uIhv7oWO5JjKE7HzoqZwYLQq-tVDygBaYf9RBym1wKKB-QPdM0iw2B8-qzHwT8wQJjR7L3R8kca153FtodwXFf5fjYlbg4clayeTOzmLoU0NoS5VRUmS7kzt1wwvLnkagqHwzwcRseZgt6Stj_rzI5Kzb90_M4_bmVL8Wbbmlcy5h5BquxJAeAV_6APm-nzNcppx_ewVF2a0_NnH-dlEPeCUTmvjr5K1Ga12qA6EII-WpULTCOt6pRWLAx3gfWOiEJ8giP2uG0O5PvUbR1AiSuheTzvc5bzm3d7MOchVVyWh489BAycV1bm9hn9KdnM6WyVvSLYAcHrHVM4wDk4z0Z4CQGLwG1RL3UqWUBD71F31LrdYNd3wvnbFIRNlwQvvOwYQzNW6QHvdyQXHFVjIBcKy-f8mZ3_j4u6W_hVuWQ6RGDXFPDMhoYjmzt_4papN2pC7JfGiTCnFDnUnzDwcLrnCNXuY10BMcqS-ZoyKPA-nuokVNHStSwbz-_1LftbjmfLv0QD_hHFBzthIU-CsqK_c4DCF1l9CW6AUrkZC_EXCIqlQhWVOfNiRaf39EY-G57mgcUh-MsHv1eP3_AYSoKGNgudhkSDYi7ftXsKAUxBlFfrtk_Wf1OXZab6nLJemKHVr3uqjAoewm3ulQs7HqG751nNHq4tUXV9rs-lCeXppfn-nVhSedw1EOzTTqKXCK869vF4sYdcdqPXI9X3xWoCnmLcgY2UHbcqq2y00udfLDuOZyF7S0XzAAgDEBWRDSeTykFZK9jBsKGy0qKy51rvRs8QbTSawDxOQpkj-UJp3BS1fTRXTA2osLL_jcWub-LZgX1Ymwvzuma6WwXxb15DLKzK0MF4VsI4hjjFdJSZYm9LGpEqKQphaacS9SP9GxENe2q7BPxjSGGJazliM96OIOWqe2RrxGjrbo6QNDHpavGwRZRNl548VKdYHKfRc3sSca_cj-hWJIIiiUR1yBnZrEAa5gh0gU08QKQ4uo70WUTotGY6=w588-h639-no?authuser=3",
    github: "https://github.com/Lereysis",
    linkedin: "https://www.linkedin.com/in/lereysis-quezada-814a2a21a/",
  },
  {
    id: "3",
    name: " Luciano Daniel Firpo",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/W0wPXe6M7OnRk-9UpU9KyekwuK6SD6GsgFaaVa0AO2zAOlz5fT1a9EbAGfYt-nIUN-bDYmgngxnKESg4Ox2Vm7U_zcOEZN-l-z-YU9_OFyHUVQzOAwFR5HRg2FLoBHD0V_hXtdHHumpOluibMWGQCR4eSup_TRkNvP7lyzVdNI6RW79veE6fzpnG_OiE4J8FQgZoDdPM44NsFN-z3AcWusY4Svnb8rTwHYulCxCb3dS1kq72ncCRDKZDZIpECpTgZi9wxo3LoAFmUuEFAVeQXdQBQHLGgRnz6YsDYCFHaObY1Tzse88NAHLEzwGSXliuIRgdtj2Zvu1nzgB39dh7vXNai7Ek8G3vVQYdWE1V0oC1V5291XupruC0g5KptvJ-P4aANwj2KuDTYuT87AiRXzJP8ZirMCCixUMhT1Y9iqi6zRzPfiDoKmIgr-MeovlsMR4Ox5XMWsmoTQ0GouLShAVN5UqI4Seer4w8xIjnkzmWypkeQiT7ZOqKO4ntYAKYxyRvDDT_1ny2zvDusDayyGrfcD0XluyEb9TGC4iVvAkPHJfSzGtC2as_yFc45DT6RV2ld4kZd-7cxSV8fQ-g_ILqyswsi_RoaMJuD_m_A23eFitEr8Zntu5mYlAsXgde70KstcxXgOWx0xq4iMR-753hYrFnad01lfvCQ5QhDOtg9PcTpAFkcDiA6G_9hF-OUVMvTCI-Q2YUr8qTXwsQTH4VdnX1tpeUwH5wz3z98pPVrNErslsSmEdCSjCBhYs8xF_5KuJYnIh1OqzDrOPECxp6rpyOBYPfTr5A5xsjYQjMZDk0vgl8RavqCuKgiyhLT-5VM2k2P07ZzU2uoYcL6A-hqFYAFXZ5mJw0Bd7ZwqxeHVGYL7KJVePNFhXjMvlfAkS0nSaWIE2HXchdMRLnueVzw8MwkDh1s70a3X5dD8WjAxIAor9z2wi2bAI5VdV_6jLl3JUyd9rRH743-SbMbZ9hVGEDtzClWXFB6i3LZY6zEaIZnBGbYn0__AHQbYBAiVEwYspJp4M1Wp47x5xHIfDz=w360-h639-no?authuser=3",
    github: "https://github.com/Luckiifirpo",
    linkedin: "https://www.linkedin.com/in/firpo-luciano",
  },
  {
    id: "4",
    name: "Nahuel Esteban Grodz",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/ktk7kREKxHP-0n4bYo7gEaXIPB-NOcbt92SszFBfFd9kLk1Gm3GtR0tjt1ea-2Wxl6m8LtAe1Xz2VER2xKwn8wgDl4Rv-KPzTd9xo_g_sp0UneRb6UT7SIFc0SGEsAasxXXTYMgaoC9uvvUB0cia5dewaP4s_YyVhRw31cH6c5MsHn0TGbQmz_FL8AuraNDacqf0-o6t0KM9ou8UuHUdoiHZznbF7Ydjca54qoVietZrgIyLz3Pi7fLfM107Cus-ZNfNWbe5F6Mfklnran0fIGWBasqcHPimYYrkdY-g9MlzIC7t0upE3vDvyuPeSXdXWex6zy8qlU1vn-zzjGZO-fQ_jwRcRK2gEoaI8vT_d2mEznX53LNm-WTwHx-GDgW2bs0rQKuZV6B__troGMawebUEe7mwzmpG0KPMQVifeC1ocHUuWxm0nq8DperHWpbp1DLPnR2HyeEJNmYSfczhlVdw4KWu9YG8czuUnJX_8pdP5o1QsedsnJRIiZwjNg8Mtpu302RJOo6R9WeHbmdOYrKA16tOBZAYM78NKocSfMzOz2e7ijI9dgNh9OpekCKmYm1DZuMkXjuk4ImTTCdVVHo0drv5s9fiCAc3gYRAYkSp4jHCHgOYxnxKTrob3F6wHjSwAC1fFGaTPLdkjwqjYecdxiZdAxZrlX4J_KGxcaLfKr9yy9pw9iXMekKnK9iQNr-VRkui44-5UQj2tsqCXY9yODPWlSlQ7FsIo1gKSSOJnet-1H7MzoDZlhkRUvVaqwiVrv31apPTxDm5BtT0dJgxUg3zTOo3CcPKMjog_1ax774HpI5qe6R7a-Cc0Wtz39-QWb0N0_mv-ngiBmVDA91HHfcR3f6d3J7FMFvJtK2A17Dowch7iZP-_rYD-8fHELOEj_t_64e9bJQ7Kl1FPYSUgOS_-_A-5Pj7KER7mcGZ4xdCPmljzCqMSG-TFSeojCojkefLigfEkquEnFslRBRP02apu6O-zR1uQPA3eI44L9PXcXuE9jg2e608iwSjr6DvrJK8hEBoSSKIc_Uj3L9x=s234-no?authuser=3",
    github: "https://github.com/Nahuk",
    linkedin: "https://www.linkedin.com/in/nahuel-grodz-059a68250/",

  },
  {
    id: "5",
    name: "Walter Martinez",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/Lu0_kpFRugQBDENRB60Hzq5vewo8MlzmnIJvwzGzBDI4XNrWIRQhqi1dS_dbyVs2c654miuHegV4yhKULkWe57nhYUZ467ZUJMOvrMJA2sV_tGSyV-6qecg8HloIhf_87WXNn6jTIDnJrsbky7QpyFK0nC6ZYoBsDHlDJTnLRpXPoc3LELI5g0fKt6U7jiP55qxcUp9Gm94lqZ_fBntPr-qxUbyfnaqzOLZsFle9LuQ2h7VIiUIQTOyUEx6uhKAA_zhTBODKFRICK-xcWuz2uIW4FfOndxMScM5Z1oIfJbIYwoVHOPf-icUpS9DjUEl_AnKrLA4jrmNBwacDlWBd1sAJuiuQ6VZ6nItVYMR13a7jSQoywMKTUY-AdRBlZx9UAqtpuRfnbwRufSV5oZR0xVj3K6_Joce6NmePNeJoabvU8wvJH6ldyCFPXIqVolulpKntGrK4kCXfvIN9iV7TTPlg3qIIAMYGGFx3mJO3pmVTDmOanPgQcXnkdBcO_CKMJrOygecekBEBHG1vEoIhdKGghsN4iFRct5PiIxVpd1QWzdCV1pmyBBBXtMux6a_x06flg0DYzUAb2Aj9CO1F46zou0aqqenxT_4_jx2AV_0WjPOnkkawAN_b18EEuDBNPFl41-NLexpFZox4wugvUA9LtPs7MYkqSBcNqXM0Haf4j8oriYlfadOZ21b1LI6oNy_qi1BGI41vzhfy4zA4Q2cMSyRDEYVdv2oAhQ1DAbQNcBE4RiJHXyPfalpkXRWIDfhMtPhg3VxoL9RiQOEbqknAqc0ZBEeB7GYxrXcnmH2e-UBlsYjSv8a0MxUHbFVZQspo8VeZc6n0zUawvBpHIpIoQqLi5rT5AFVHtKXO4TjCbmLkaTj1sJkJWGDbJqtcLwdYGBCLrlvN8spQOJ340CVQDCdvh6SFZew_JszCXuFZYo6GggmMzWQJTuPuIuEoyS--zpgvkw3Mgi9IaeFUS6wkeEJpW0q7JyOnvVOZX70ZCyzyWszpnKL2gZ8kyIwDTMXYwr574ljjW-bLsR_Kmx2d=w665-h639-no?authuser=3",
    github: "https://github.com/wal90",
    linkedin: "https://www.linkedin.com/in/walter-martinez-71024529/",

  },
  {
    id: "6",
    name: "William Estrada",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/g8PwBEkS22BJ-3M1ewM7onwJb_ubPtU13ie79EVEYh-oXloU1M69fIIjP65ZdHltCLcnhSghFj0aSM6MW5cd9Pqp4_cvdk4klBEZwrwY-zarqriif_VLe_oLE0Qf4MJcL_ofZXTXaGTQCwl4GcioWFsWTjNmhwL99YJeTdgRc0e4ovMzU3pul4RWxS1LNL4WjJ7IUSzWLU0KOgAjAiZNh1o2Ud8SgGFSKT1eBOznJTLfk_VY9HNHPW1H4E3TAkWpAzQzSHX6M7eD-5uRlRzu0G0WTDpC_oC9r7gCzIkag9v3aPCFbTOTXHnrgG4UJ3z8TL0O-Bf19MR-3-XO0rRqoTMlTB6-ZzGzLoW8QoHilEM9cYGvD_7dIDn7GR1oekwdutjQn-Pf_uwbKNhnQXEMkOXc9BvuSYzqjQbw9ZSpgI_cffKTXUNgoVj1Lh2DA-rMc8C0p_jd9abn18ENaSapaDK76tS4VUK61RGMMJnsklUf2CtrfUtd3igsZfW-jCjCDtdOPWlqC0hZnmyKIKx5gqPx4rZFpgGS4xgLhZrXaumLH2RovRDJfiGTml7yXIAsj_WAqziGGdnzUHQBFgzI530CtDcIAtReC4m77BMmtVTVPaxZuJWPImO4exOjftgjrkOG3FWLovQorCSObTr2ckABY1HEm98XfbPsRwk2FiY0y43z5exn3jgn0CojFqNuGBZafSKU3_YQ2PhNyzyP8c2IMeoKAEYQLty0kODedlK4TebWPGUmbiZZxezQRtjfel73JUhzo3eMJjJ3RUrZnL-qjULcA09bXaYu-AoOf1qRlgqkwaHQCGEpvpyDm6pMhHJUAVjmDmkxWeTj0piBzDYz1BUmxTqKtkrs4MfTzTHlknf4NIBUyyL9CgspaVfuh58H4MtouUssWjaMUJ8Ov4jq31u1ai7--xJkHw3oXFDfMpNlXUdkD4ZaNC8A__qOjIpsziNQFgG9RNfK940P5DOthikJvEXkUfcFRimKpFVBlr7eJNMiBzCDcO-fOLgAnYYN6uQL3j0UO62z7Bg6bmxG=s444-no?authuser=3",
    github: "https://github.com/wcamest",
    linkedin: "https://www.linkedin.com/in/william-camilo-estrada-ochoa-565b42174",
  },
  {
    id: "7",
    name: "Cristian Fernando Frias",
    description: "Full Stack Developers",
    img: "https://lh3.googleusercontent.com/4aHeVNriKIEsbuZp5BmZG5W3LVaBjR_yejGJZjkg-YbxwGHvLXEu3tz3azjUqjTR4G00gr9Di5ZXbqzIkLNJHuF-7Kj7K3yFhSCFle0C13A0ci7MUsq78ixETWGQYkAj6ceTk_ivNnwrzRO3uTYbNha0-ewomRpl5OeRyqK8uus9qaG4rCfBwN1D9P2bMndky7PgzAP_ilW4TuKv-UadYdWBeXKmNM43Ise-rqT5N9VnDbvye9jVBToQnZ8LTyCqM2Gh_qdXnPSS-0j_H8ariKXUG82RMDstDFyYKsdBEgW54jQFgwTfusGTim8T9SmHwm82eebdkJAVu3liAQ-mfEposbZurXPRRCo8aqiFIdb-L9wAy5fRbpSHLjjQwHNsflEByl79vBAxHDsLNfq3Z95Y4tGT7OGHo38_HLQJHFo6qVIZIKPBvxj8P3Wb4FxrHKiSFb2WaAjqcqxcIT3c_7Ak8FWLIh-Pk22lH5I8IjbR3biHBt-RWAiM6e8HGM64OeFg9ryGvXmCnS2W1YNLW-vAzBvj9auWUTWxRdfD6ewSkLJgLsxXD2FsH8Dm91Ypa_cQAiX-1D_jz8SY9klVweT1AKQIyYnjcRcd3orE__mUzPeaDbcgNs2A7mEOTLY6pXa05svOHR7hIfGong8A8saq8ukd8Ng0jJroIdovVroiwRL2AgmhZ8UGnyGPASZytQd6NS0gG1nC2OcCOBinhvCjkaUdsBJ88fpAl8P2es_z3mZjylP09AG3cWf6H_L8xWInudpyyyfHI7JzpSw_TonoolW7m2TPEXL9tAp9WvEnLd6HQOMndZKTXOCQy3F77YX21HPSBymUKxd49vibnlva_V-w7EnSWOoi9KrpxPnz99kTNpWF6nYR4YNnqy4g2fnoZsJUQZ06EZIFwtEqCkM33cfktI9kLQDqMUxGO96usC5apncc3wWnQ-wPYwGbibOTB3LcmsU6Sqk9fzn2yQvQYLbew6nw0ckR09HO5bqLxg1bSqV0ajpwQPwdUib617ed-3cN7wkxKr-z5RxLuzDA=w640-h639-no?authuser=3",
    github: "https://github.com/ffernando93",
    linkedin: "https://www.linkedin.com/in/fernando-frias-/",
  },
];

const AboutUs = () => {

  const dispatch = useDispatch();
  const globalState = useSelector((state) => state.aboutUs);
  const lang = useSelector((state) => state.lang.currentLangData);

  const OnChangePage = (page) => {
    dispatch(setCurrentPage(page));
  }

  useEffect(() => {

  }, [globalState, lang]);

  return (
    <div>
      <Container style={{ marginTop: 150, marginBottom: 30 }} >
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
        >
          <Grid item md={3}>
            <Typography
              component="h4"
              variant="h4"
              sx={{
                color: "#FF3041",
                textTransform: "uppercase",
                fontWeight: "700",
              }}
            >
              {lang.quienesSomos.titles.quienesSomos}
            </Typography>
            <Typography component="p" sx={{ margin: "10px 0px" }}>
              {/* Somos estudiantes de Henry cursando la etapa final del bootcamp
              donde tenemos que desarrollar una aplicación en grupo cumpliendo
              diferentes objetivos propuestos por el bootcamp. Esta aplicación
              web tiene como objetivo conectar personas con posibles mascotas en
              adopción, además de brindar la posibilidad de hacer donaciones
            para mejorar la calidad de vida de las mascotas.*/}
            {lang.quienesSomos.paragraphs.quienesSomos}
            </Typography>
          </Grid>
          <Grid Grid item md={9}>
            <CardViewer cardType="team_member_card" cardsDataList={testingData} currentPage={globalState.currentPage} onChangePage={OnChangePage} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AboutUs;