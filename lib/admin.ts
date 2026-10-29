import "server-only";
import { createClient } from "@/lib/supabase/server";
export {sameOrigin} from './request-origin';
export async function adminSession(){
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) return null;
 const {data:isAdmin,error}=await supabase.rpc('is_admin');
 if(error||isAdmin!==true) return null;
 return {supabase,user};
}
