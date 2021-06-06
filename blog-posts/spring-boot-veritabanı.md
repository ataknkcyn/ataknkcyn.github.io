# Spring-Boot ile Veri Tabanı İşlemleri

Merhaba, bu yazımda sizlerle spring-boot üzerinde MySQL kullanarak nasıl basit veri tabanı işlemleri gerçekleştirebileceğimizi anlatmaya çalışıcam.

## Gereksinimler
[Spring Initializr](https://start.spring.io/) üzerinden gerekli bağımlılıklarımızı eklememiz gerekiyor. Eklememiz gereken bağımlılıklar **Spring Web, Spring Data JPA, MySQL Driver, Lombok.** Örnek olarak aşağıdaki resime bakabilirsiniz. 

![enter image description here](https://lh3.googleusercontent.com/2mNHK5K9Z-w9ftygAGLO54u6ZxGx7MpX_6_XW3iA8lqjNQ1N7z0GCKZHJ9K2-ZhdZvO7yp3yFc5o_AiJ6Wj9291Be-umBLRmyvgLy4xdrRzqfg3MPFVD9ftXU6F-98tgz3ohUp2Hu10Iy_4RCB5aqHP044oRM3AYtKmXLHz5XmDEO5dOox-gP4Wph2FtcPxaoilCoiHKty-tOLgf8bah-N4RLQeHg5homucRtMYTn-piexsEOuTWBPXHDOZHxGuwpUK9LHghr3DDWv-CTtCcXcaboY1mmNvCgSNqC6B3ZOnpBRc6LtBVnPHC6kB48SEUpK0VLASPDlo0SlAgoxFoljlwaByqm_gU_nNZOerKdGmCg0F3DZYAIg97r7SU8xfHWb-5fWglQYmalrdajtDiPcBMiEq8hvyF7yUijiMfGJhP191GI2eH6YyDslslqryUdQKyttjkZS0zSShgyEzidUb_EOTfZPrKHLnAYWvmhA2f-xCUg6S3db8Ey72SjBnYrJfkndTps78yPXEpsUFTni1KaQrs75FDLPaJ54UyHlrcZHBHKTb-rjtnJTSk_5od8gC8YfsTgFrfWBRtHrowNGGiwWfLGdELHB2usYskpvWW_mKWbasPnEj-PR6hSiR73JS2-LoM5rWZdj1k7HCKLnSP6FsloBeYKoDY_b6Tju1a6shYnDOgrE4b0RS7cIzmnTKfVgorUFdmO3OOfo2o1Oc=w516-h268-no?authuser=0)


## Dosya Yapısı
Bu anlatımda **src/main** iceriği dışında herhangi bir değişiklik yapılmayacağından dolayı **src/main** dosya yapısı aşağıdaki gibi olacaktır. 

    📦main  
     ┣ 📂java  
     ┃ ┗ 📂springboot  
     ┃ ┃ ┗ 📂crud  
     ┃ ┃ ┃ ┣ 📂controller  
     ┃ ┃ ┃ ┃ ┗ 📜kitapController.java  
     ┃ ┃ ┃ ┣ 📂model  
     ┃ ┃ ┃ ┃ ┗ 📜kitaplar.java  
     ┃ ┃ ┃ ┣ 📂repo  
     ┃ ┃ ┃ ┃ ┗ 📜KitapRepository.java  
     ┃ ┃ ┃ ┣ 📜CrudApplication.java  
     ┃ ┃ ┃ ┗ 📜ServletInitializer.java  
     ┗ 📂resources  
     ┃ ┣ 📂static  
     ┃ ┣ 📂templates  
     ┃ ┗ 📜application.properties
			 
##  Veritabanının Oluşturulması
phpMyAdmin kullandığımdan dolayı veritabanımı oluşturdum. **kitaplar** isminde aşağıdaki yapıya sahip bir tablo oluşturdum.
![enter image description here](https://lh3.googleusercontent.com/XQdDoOTDI9GVYycU4yv2Mj0plkShA1HzOh39tZG2ZcHPx35lhKL28klB6Iv2jm6J2R4IaHVzhA6lKSN_gdKjEQ6FCvR7I43wCySTMWFOwwfTbwy3ilQAhx2m1qELHXn5VD0tL6iD-3W7-vA4s3pqfpWgCu4zku-HV9fbvdM-82Njz4_KunTCrLH17l1zzxByxVht2Or0-AMtCxOciFmg0sc_J53FMEnbBpoweq3tebxLZ4cmKPgyxBvxsOkttMQv8DEE-Iv_W3-L5DxuGE-Hw7O4n013Xv9XpEDxxZ3tPyaFC4xMWOBvaGQJGxfPwvC6t1IUVTselwW8z_JmWOjtgCcwRHtDUrLdY-IAGgdpZG-YbD7h7M8h2XcY10N0vcxoBOIXCgMXVPD-8fabPWTDpH_Ir4QxVe851ad4zrSuwTvA4ezjH9vdRuuRCbkGIDal1uVyTY46vhXXSc7xWJou8_AJEnu7FpP5VsQwmwhkd6IJJMr2rctzKDzqCBt6_iyQEXGxw4SNgd0htJ-ECcYKbYA13CuSvt8ZFB49NRug-0JMkD2Tu3-VMrSq509v6bGOK7J_1V0ewztuOV7zdwvX9Jy0UHlfBxP5oG5CcQsyZsOoTBKpFxUPCWaYSSdSjgSBvIOMEBVhEkKHLouWgXd1mz_m9p03NxW9MAdpI66Zuz5QSMfV-h25DMMEp02tGzeFcK02MOt45fVJ7NTwhbKUBXE=w990-h135-no?authuser=0)


## application.properties
application.properties dosyamız ile oluşturduğumuz veritabanımızı projemize bağlamamız gerekiyor. Örnekte olduğu gibi kendi veritabanı adresinizi, kullanıcı adı ve şifrenizi yazarak veritabanınızı projeye dahil edebilirsiniz.

    spring.datasource.url=jdbc:mysql://localhost:3306/spring_crud  
	spring.datasource.username=root  
	spring.datasource.password=

## Model Yapısı

Model yapısı bizim için nesnenin veritabanında tanımlanmış tüm özelliklerini barındırması gereken bir yapıdır. İstenirse projenin yapısı ve gidişatı gibi durumlarda farklı özellikler eklenebilir fakat bizim için aşağıdaki kısım şu an için yeterli olacaktır.
**Lombok** bağımlılığı sayesinde ekstra yazmamız gereken methodların(get,set) bu şekilde önüne geçerek kısa ve okunaklı bir kod yazmamıza yardım ediyor.

        package springboot.crud.model;  
      
	    import lombok.Getter;  
	    import lombok.Setter;  
	    import lombok.ToString;  	     
      
	    import javax.persistence.*;  
	    import java.sql.Timestamp;  
      
	    @Entity  
	    @Getter  
	    @Setter  
	    @ToString  
	    public class kitaplar {  
	        @Id  
		    @GeneratedValue(strategy = GenerationType.IDENTITY)  
	        private Long id;  
	      
	        @Column  
		    private String kitap_ismi;  
	      
	        @Column  
		    private String yazar;  
	      
	        @Column  
		    private Timestamp eklenme_tarihi;  
    }

## Repository Oluşturulması

Bu projede JpaRepository kullanarak sorgu işlemlerinin büyük bir çoğunluğundan kurtulmak istedim. Eğer dökümantasyonunu inceleyip farklı sorgu yapılarını vs. görmek isterseniz [JPA Repositories](https://docs.spring.io/spring-data/jpa/docs/1.5.0.RELEASE/reference/html/jpa.repositories.html) kısmına gidebilirsiniz.

   

     package springboot.crud.repo;  
      
    import org.springframework.data.jpa.repository.JpaRepository;       
    import springboot.crud.model.kitaplar;  
      
    @Repository  
    public interface KitapRepository extends JpaRepository<kitaplar, Long> {  
      
    }


## Controller Oluşturulması

Bu yazıda basit işlemler yaptığımızdan dolayı service kısmını ekleyip işleri olduğundan daha karmaşık hale getirmek istemedim. Service yapısının gereksiz olduğu anlamına gelmiyor. İnternetten biraz araştırılıp service yapısının hangi durumlarda kullanıldığını rahatça görebilirsiniz. 

    package springboot.crud.controller;  
      
    import lombok.RequiredArgsConstructor;  
    import org.springframework.web.bind.annotation.*;  
    import springboot.crud.model.kitaplar;  
    import springboot.crud.repo.KitapRepository;  
      
    import java.util.List;  
    import java.util.Optional;  
      
    @RestController  
    @RequestMapping("/")  
    @RequiredArgsConstructor  
    public class kitapController {  
      
        private final KitapRepository kitapRepository;  
      
        @GetMapping("/list")  
        public List<kitaplar> kitapList() {  
            return kitapRepository.findAll();  
        }  
      
        @GetMapping("/list/{id}")  
        public Optional<kitaplar> id_kitap_getir(@PathVariable Long id) {  
            return kitapRepository.findById(id);  
        }  
      
        @PostMapping("/ekle")  
        public kitaplar kitapEkle(kitaplar ekle_kitap){  
            return kitapRepository.save(ekle_kitap);  
        }  
      
        @PostMapping("/sil/{id}")  
        public boolean kitapSil(@PathVariable Long id){  
            kitapRepository.deleteById(id);  
            return true;  
        }  
      
    }

## ÇALIŞTIRALIM

**EKLEME İŞLEMİ** (tekrar tekrar aynı şekilde eklenebilir)
![enter image description here](https://lh3.googleusercontent.com/-MkLmVs19-YHiux3ZeZOLdDqoZqMH44Qb2ibtAaTLr6dx11KYbXYgnBcMHsQc5Y8ER1NCmkQ7ziZse4pdMGPoPxkhNKEtFhh64RbX_QqIU6y5yGytZonzDs3HtNrUR9Wzh2oYcmKurzZraT4Fn3VOs27101uCpAPOu4EDGU6-WLla0NDv84v8AL9gi2fD_jQ0XSwTKxECt2Mpl2Zs7OU77du99APqD3UPs7JjqTK5HqMOKvzcKazRf2uy1arLvPqfJqZx9_3ToCVxmdcLsnHBTTnIHIqlVjCO7FXFkpanl3s-zWoOfGmvNYWzBQuisLjFHuqXPm1hjO8n8XfLmifq3xgBmFTB0sGaBt36AMlY-fXY-dH8FOvSHTxbCXnlPEXRojeUtf3wJZy52dTOmDsQmflKWbpK1lKPIJ5o7ylB1lKOo0yRxrpPzwwn-aQz6mQvU0-UK73JC9Hm3tFtyK2WWM0Xa749LIhYDLfhPUK0m8kh5ibMOERxQreq_mPZZj9ks2p7gyvB8qq4KQE2kyQPbPQnR9-4Ah4bizUVgry64MJLSaE7J2LrItEDHF6rNr-_dvW5VLe_r4z3ssEMsLZPOlaUQVX5JQ0dPlNzva4fYC7TyjN1ErL1YUKlzeO2EjLPtms0h5oCY4Dt3wcKS6I-OttaXGaoCu_0oHaw67vfqhT9VPmMfjziRDFwk97U7_-0ujLey0KEf2Cne0ZZOqMNaI=w696-h493-no?authuser=0)


**LİSTELEME İŞLEMİ**
![enter image description here](https://lh3.googleusercontent.com/WUtKQ7NJc4yo1NO6WE57YpIdGsIgmbxKwgXFAmIf2bPYm75KOFAmkZHmUx2i65sU1FIX_V6E6hghawD964A4AAKY9hs5nh-kuDvCKcEU6y7rDlUQnAQ1HzQJduOXe0_PcSB2WOmXBd_b-DK3BbxGqYcvikway2QlTRbPppcgnWVMot-PgMocqr5h1at71NOYhoQs8SqrSWfPGtxSPebhbjtmFubrMBppZSyO3_R_v1sGDOWNBmPBBvPB6AhXJCwhRU9MW04TdGnT6C5MnVF66Ip5NltbUH4b5SVBW2JJmi--AsLOKmZZE9sN1C7atywdnyZxbltUUPv_MfRRMVgVOHk_jodib-CeQ4f4ZNFcGQfhag-mLL3Hn6IgRdJ3EjuC-CD1lcacmMlU2DEB3rJIVOWcGoNNpTEardzWGoGPeIt8oiNQoq6A6Lx4kHbVE57f4azqUW7J6YQdlwQ51z6kJzCBmOnW8fg45ZobwPngm_eBgTdiTJ_BmuzZAVXGF_MNuB_uDLP48Q2MXoL4Y3eohM_7DzDt-F7hbrkir5uYSDcFE0UGGW8qAboOShYWqshatC-lwfWRbDMJQS1KHAmB2jmDt91BFEBeS7ZFITjSfSDdo36Qk2z6Iv9nRXjjdLkFLfANv4jKYSk5FJXR36DDwEyAeayuYwUJ92D_uJOj9Eessxfy27eqIRIeyxMAw-VVQTBnGbdl7aMz2TwU-lNhcmQ=w560-h594-no?authuser=0)


**id'ye GÖRE GETİRME İŞLEMİ**
![enter image description here](https://lh3.googleusercontent.com/bSebdJQq8ywJvMxN8gYZh5Zj5_yxp2US9n1QY1kW3mPjw1tGwRyProRLgTXxvCniEnoiD0Hs_x5DmNWMWSRGCEBaxBsqXdTdCtyyUtCyclVDYLZLWPmL-4rf97FBxcCF-E-oVyQ4GuyVMaMzYV88tvTK-iAh0EfEB7wCgt3ghNuyntXZRpZrlr87xbKm4U7cFAXjWwguOMdkMIikkxRL4shXlVsXBV4QD6Ou3MsEM3Gx4s5oGht5H0Shpm48VdH-w29AerLtfz71UQUmQ0gAKLCpaIEU6pn-Z_YKlJYz_yzFHJN3xwlGMIAapS346UegNoLL4P-KGsXptgA2ogih5gIZULgA4RUXUPLoLNWav1OLsrxXzMI23v7bs0ww5FzAZXfc7-pYWFLc2EwspbGjAdl7-SS4KkZs4lLqDiehUPhbrfPhHtzDHt9GAl80lbq4T2Tpp0bWm6APbRxDROc51qDd_0OoDA3tF1-ZzLJrLJ5ModKE-ONZc5q5oo402-ipIVFfxNn2wNCw7Gq4VU2cnuTytMfxnVgFd4GjPw5Lme7Ait4hYpm9AtO_JkwyUT27zq82yaY67rYqcoPosAH3YE9XqZpdl8KCbSN0vT4x4pR62jDlN4dcBUvUH64VFh94XgioTpyT3KiZ9gzQtUNdFq6siwJrsrIRmwLUn6NGvOLJmW483R7gZiDGP50Q5iW_O_Su9S7ta96GtL42pu5-4AI=w474-h314-no?authuser=0)
