import "server-only";
import { createClient } from "@/lib/supabase/server";
export async function adminSession(){
 const supabase=await createClient();
 const {data:{user}}=await supabase.auth.getUser();
 if(!user) return null;
 const {data:isAdmin,error}=await supabase.rpc('is_admin');
 if(error||isAdmin!==true) return null;
 return {supabase,user};
}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');return !origin||origin===new URL(req.url).origin;}
