import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";

export function CategoryCard({ category }: { category: string }) {
   return (
     <Card className="overflow-hidden">
       <div className="relative">
         <img
           src="/placeholder.svg?height=150&width=300"
           alt={category}
           width={300}
           height={150}
           className="w-full h-[150px] object-cover"
         />
         <div className="absolute top-2 right-2">
           <Badge className="bg-blue-800">{category}</Badge>
         </div>
       </div>
     </Card>
   )
 }