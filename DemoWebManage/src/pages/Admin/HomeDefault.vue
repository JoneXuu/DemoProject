<template>
	<div >
	  <a-card :bordered="false" title="待办事项">
	     <a-card-grid  class="onePart" v-for="(it,index) in 4" :key="index">
			<a-card-meta class="cardMeta" :title="it" :description="'数据'+it" >
			  <a-avatar style="background-color: #00ff90;"  size="large" slot="avatar" icon="bar-chart" />
			</a-card-meta>
	     </a-card-grid>
	  </a-card>
	  <a-card :bordered="false"  title="数据总览">
	     <a-card-grid class="onePart" v-for="(it,index) in 24" :key="index">
			<a-icon style="color: #0000EE;" type="radar-chart" />
			  数据{{it}}
	     </a-card-grid>
	  </a-card>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				data:"",
			}
		},
		mounted() {
			
		},
		methods:{
			pageFun(){
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.moduleAll{
		.onePart{
			width:25%;
			height: 100%;
			text-align:center;
			.cardMeta{
				display: flex;
				align-items: center;
				justify-content: center;
			}
		}
	}
</style>
