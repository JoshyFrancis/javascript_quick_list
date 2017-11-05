## Javascript quick list component

View [demo](https://joshyfrancis.github.io/javascript_quick_list/quick_list_test.htm).


PHP Server side

          	$search= isset($_POST['search'])?$_POST['search']:'' ;
					$id_value= isset($_POST['id_value'])?intval($_POST['id_value']):0 ;
					$customer=DB::select('select ID,Customer_Name,Address,Mobile,Email
            from customer where ID='.$id_value.' OR  CONCAT(Customer_Name,Address,Mobile,Email) like "%'.$search.'%" order by Customer_Name limit 50 ' );
        return json_encode($customer);
