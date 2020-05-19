// export class Constants{
// // localhost URl
// const BASE_URL="http://localhost:8080/";
// }

export class AppConstants {
    public static get baseURL(): string
    {
        //Local URL
           const BASE_URL="http://localhost:8080/";

        //Dev URL

     //  const BASE_URL="https://deepak-sellyourfurniture-jan-20-dev-api.azurewebsites.net/"

        //QA url
        //  const BASE_URL="https://deepak-sellyourfurniture-jan-20-qa-api.azurewebsites.net/"


        return BASE_URL;
     }


       public static loggedin=true;
}
