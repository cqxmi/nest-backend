import { Authority } from 'src/modules/auth/entity';

export const buildTree = (
  data: Array<Authority>,
): Array<Authority & { children: Array<Authority & { children: any }> }> => {
  // ✅ 使用索引签名，明确 map 的类型
  const map: { [key: number]: Authority & { children: Array<any> } } = {};
  const roots: Array<Authority & { children: Array<any> }> = [];

  // 第一步：初始化所有节点，并添加 children 数组
  data.forEach((item: Authority) => {
    map[item.id] = { ...item, children: [] };
  });

  // 第二步：构建父子关系
  data.forEach((item: Authority) => {
    if (item.parentId === 0) {
      roots.push(map[item.id]);
    } else {
      if (map[item.parentId]) {
        map[item.parentId].children.push(map[item.id]); // ✅ 现在类型安全
      }
    }
  });

  return roots;
};
