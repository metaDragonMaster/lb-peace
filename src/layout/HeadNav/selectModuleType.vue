<template>
	<ul class="select-module-type">
		<Link v-for="(item, index) in moduleTypes" :key="index" :to="item.path">
			<li
				:class="{ active: item.id == activeId }"
				@click="setModule(item)"
			>
				{{ item.type }}
			</li>
		</Link>
	</ul>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { UseStoreModule } from "@/stores/module";
const storeModule = UseStoreModule();
const { setType } = storeModule;
const Route = useRoute();

onMounted(() => {
	startActive();
});
function startActive() {
	moduleTypes.map((item) => {
		if (item.path == Route.fullPath) {
			setModule(item)
		}
	});
}
const activeId = ref("");
const moduleTypes = [
	{
		id: "0",
		type: "LB",
		path: "/LB",
	},
	{
		id: "1",
		type: "NFT",
		path: "/NFT",
	},
];

function setModule(item) {
	activeId.value = item.id;
	setType(item.type);
}
</script>
<style lang="scss" scoped>
.select-module-type {
	display: flex;
	border: 1px solid #666666;
	li {
		width: 110px;
		height: 40px;
		cursor: pointer;
		display: grid;
		place-items: center;
		&.active {
			background-color: #00cefb;
		}
	}
}
</style>
