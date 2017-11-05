## Javascript quick list component

View [demo](https://joshyfrancis.github.io/javascript_quick_list/quick_list_test.htm).


## PHP Server side

	$search= isset($_POST['search'])?$_POST['search']:'' ;
	$id_value= isset($_POST['id_value'])?intval($_POST['id_value']):0 ;
	$customer=DB::select('select ID,Customer_Name,Address,Mobile,Email
	from customer where ID='.$id_value.' OR  CONCAT(Customer_Name,Address,Mobile,Email) like "%'.$search.'%" order by Customer_Name limit 50 ' );
        return json_encode($customer);

## Javascript client side

	<script src="quick_list.js" type="text/javascript"></script>
			<script>
		 var Customer_Name=$('#Customer_Name')[0];
			
	 var quick_list_1=new quick_list(Customer_Name,{
		url:'{{url("API/customer")}}',  ajax_data:{head:'get_customer'},  id_column:'ID'
		,  display_column:'Name : <b><a href="{{url('customer')}}/(ID)/edit" style="color:black;">(Customer_Name)</a></b><br>Address : (Address)<br>Mobile : (Mobile)<br>Email:  (Email)'
		,display_name_fields_in_brackets:true
		,value_column:'Customer_Name'
		, list_height:250,  min_search_length:0,  default_data:{ID: CustomerID.value},highlight_tag:'<span style="font-weight:bold;">[content]</span>'
		,allow_deselect:true
		});
							
		quick_list_1.on_select=function(data){
			CustomerID.value=data.ID;
			if(data.ID===''){
				data.Address='';
				data.Mobile='';
				data.Email='';

			}
					
		};
			
						 
	quick_list_1.add_footer('<span style="font-weight: bold;  font-size: 16px;color: #32c5d2!important;"> Add Customer</span> ',function(){
			var modal_add_customer = $('#modal_add_customer');
			$('#Customer_Name_m').val('');
			$('#Address').val('');
			$('#Mobile').val('');
			$('#Email').val('');

			modal_add_customer.on('click', '.update', function(){
				 if( $('#Customer_Name_m').val().replace(/\n/g,'').replace(/^ +| +$/gm, '')==''){
						alert('Please enter Customer Name ');
						$('#Customer_Name_m').focus();
						return;
				}


			  	modal_add_customer.find('.close').click();
			});


			modal_add_customer.modal();	

		});

							
