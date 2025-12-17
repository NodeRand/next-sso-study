// /home/ubuntu/festimap-frontend-business/ecosystem.config.js
module.exports = {
  apps: [
    {
      name: 'festimap-frontend-stamp',
      script: 'standalone/server.js', // Next standalone 진입점
      cwd: '/home/ubuntu/festimap-frontend-stamp/current', // ✅ 실행 CWD 고정
      args: '-- -p 3000',

      /* ✨ 추가: Node.js 힙 메모리 제한 (최대 750M 사용(ec2 최대 용량이 1GB이므로).
      인스턴스 RAM에 따라 조절 필요) */
      // 이 제한을 초과하면 프로세스가 OOM 에러를 내고 종료되어, 시스템 전체의 스와핑을 방지합니다.
      node_args: ['--max-old-space-size=750'],

      // ✨ 추가: 메모리 기반 자동 재시작 설정 (PM2 Safety Net)
      // 프로세스 메모리 사용량이 350MB를 초과하면 PM2가 자동으로 프로세스를 재시작합니다.
      // 🚨 이는 메모리 누수로 인한 시스템 마비(Thrashing)를 막는 임시 방편입니다.
      max_memory_restart: '350M',

      // ✨ 추가: 비정상 종료 시 지연 시간 설정 (안정성 강화)
      // 프로세스가 종료되거나 실패했을 때 즉시 재시작하지 않고 5초 대기 후 시도합니다.
      restart_delay: 5000,

      env: {
        NODE_ENV: 'production',
        PORT: '3000',
        HOST: '127.0.0.1',
      },
      // instances: 1,
      // exec_mode: "fork",
    },
  ],
};
